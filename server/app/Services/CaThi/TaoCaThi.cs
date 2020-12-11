using System.Threading.Tasks;
using Server.Entity;
using Server.Enum;
using Server.Model.Request;
using Server.Model.Response;

namespace Server.Service
{
  public partial class CaThiService
  {
    public async Task<Response<CaThiResponse>> TaoCaThi(long idHocPhan, TaoCaThiRequest request)
    {
      var hocPhan = await _hocPhanRepo.GetHocPhanById(idHocPhan);

      if (hocPhan == null)
        return new Response<CaThiResponse>
        {
          StatusCode = 400,
          Success = false,
          Errors = new[] { "Không tìm thấy học phần" }
        };

      var caThi = new CaThi
      {
        TenCaThi = request.TenCaThi,
        ThoiGianBatDau = request.ThoiGianBatDau,
        ThoiGianThi = request.ThoiGianThi,
        TrangThai = TrangThaiCaThi.ChuaBatDau,
        IdHocPhan = idHocPhan,
        IdLopHoc = request.IdLopHoc,
        IdGiamThi = request.IdGiamThi,
        IdDeThi = request.IdDeThi
      };

      var newCaThi = await _caThiRepo.CreateCaThi(caThi);
      var lopHoc = await _lopHocRepo.GetLopHocById(newCaThi.IdLopHoc);
      var deThi = await _deThiRepo.GetDeThiById(newCaThi.IdDeThi);
      var dsIdCauHoi = _deThiRepo.GetDsIdCauHoi(deThi.Id);
      var dsCauHoi = await _cauHoiRepo.GetMultipleCauHoiById(dsIdCauHoi);
      var deThiResponse = new DeThiResponse(deThi, dsCauHoi);
      var giamThi = await _taiKhoanRepo.GetTaiKhoanById(newCaThi.IdGiamThi);
      var caThiResponse = new CaThiResponse(newCaThi, lopHoc, deThiResponse, giamThi);

      var dsSinhVien = _sinhVienRepo.GetAllInLopHoc(lopHoc.Id);

      foreach (var sinhVien in dsSinhVien)
      {
        var thiSinh = new ThiSinh
        {
          IdCaThi = newCaThi.Id,
          IdSinhVien = sinhVien.Id,
          SoLanDangNhap = 0,
          TenMay = null,
          DiaChiIp = null,
          TrangThaiThi = TrangThaiThi.ChuaThi
        };

        await _thiSinhRepo.CreateThiSinh(thiSinh);
      }

      return new Response<CaThiResponse>
      {
        StatusCode = 201,
        Success = true,
        Data = caThiResponse
      };
    }
  }
}
using System;
using System.Threading.Tasks;
using Server.Entity;
using Server.Enum;
using Server.Model.Request;
using Server.Model.Response;

namespace Server.Service
{
  public partial class CaThiService
  {
    public async Task<Response<CaThiResponse>> BatDauCaThi(long idTaiKhoan, long id, long ticks)
    {
      var caThi = await _caThiRepo.GetCaThiById(id);

      if (caThi == null)
        return new Response<CaThiResponse>
        {
          StatusCode = 400,
          Success = false,
          Errors = new[] { "Không tìm thấy ca thi" }
        };

      if (caThi.IdGiamThi != idTaiKhoan)
        return new Response<CaThiResponse>
        {
          StatusCode = 403,
          Success = false,
          Errors = new[] { "Không có quyền thực hiện thao tác. Giám thị được chỉ định mới có thể thực hiện thao tác này" }
        };

      if (caThi.TrangThai == TrangThaiCaThi.DaBatDau)
        return new Response<CaThiResponse>
        {
          StatusCode = 403,
          Success = false,
          Errors = new[] { "Ca thi đã bắt đầu" }
        };

      var random = new Random();
      var maBaoVe = random.Next(100000, 999999);

      caThi.MaBaoVe = maBaoVe.ToString();
      caThi.TrangThai = TrangThaiCaThi.DaBatDau;
      caThi.ThoiGianBatDau = ticks;

      await _caThiRepo.UpdateCaThi(caThi);

      var lopHoc = await _lopHocRepo.GetLopHocById(caThi.IdLopHoc);
      var deThi = await _deThiRepo.GetDeThiById(caThi.IdDeThi);
      var dsIdCauHoi = _deThiRepo.GetDsIdCauHoi(deThi.Id);
      var dsCauHoi = await _cauHoiRepo.GetMultipleCauHoiById(dsIdCauHoi);
      var deThiResponse = new DeThiResponse(deThi, dsCauHoi);
      var giamThi = await _taiKhoanRepo.GetTaiKhoanById(caThi.IdGiamThi);
      var caThiResponse = new CaThiResponse(caThi, lopHoc, deThiResponse, giamThi);

      return new Response<CaThiResponse>
      {
        StatusCode = 200,
        Success = true,
        Data = caThiResponse
      };
    }
  }
}
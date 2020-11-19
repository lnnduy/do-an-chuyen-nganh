using System.Threading.Tasks;
using Server.Entity;
using Server.Model.Request;
using Server.Model.Response;

namespace Server.Service
{
  public partial class CaThiService
  {
    public async Task<Response<CaThiResponse>> CapNhatCaThi(long id, TaoCaThiRequest request)
    {
      var caThi = await _caThiRepo.GetCaThiById(id);

      if (caThi == null)
        return new Response<CaThiResponse>
        {
          StatusCode = 400,
          Success = false,
          Errors = new[] { "Không tìm thấy ca thi" }
        };

      caThi.TenCaThi = request.TenCaThi;
      caThi.ThoiGianBatDau = request.ThoiGianBatDau;
      caThi.ThoiGianThi = request.ThoiGianThi;
      caThi.IdLopHoc = request.IdLopHoc;
      caThi.IdGiamThi = request.IdGiamThi;
      caThi.IdDeThi = request.IdDeThi;

      var updatedCaThi = await _caThiRepo.UpdateCaThi(caThi);
      var lopHoc = await _lopHocRepo.GetLopHocById(updatedCaThi.IdLopHoc);
      var deThi = await _deThiRepo.GetDeThiById(updatedCaThi.IdDeThi);
      var dsIdCauHoi = _deThiRepo.GetDsIdCauHoi(deThi.Id);
      var dsCauHoi = await _cauHoiRepo.GetMultipleCauHoiById(dsIdCauHoi);
      var deThiResponse = new DeThiResponse(deThi, dsCauHoi);
      var giamThi = await _taiKhoanRepo.GetTaiKhoanById(updatedCaThi.IdGiamThi);
      var caThiResponse = new CaThiResponse(updatedCaThi, lopHoc, deThiResponse, giamThi);

      return new Response<CaThiResponse>
      {
        StatusCode = 200,
        Success = true,
        Data = caThiResponse
      };
    }
  }
}
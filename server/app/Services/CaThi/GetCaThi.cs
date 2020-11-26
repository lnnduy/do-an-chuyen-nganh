using System.Threading.Tasks;
using Server.Model.Response;

namespace Server.Service
{
  public partial class CaThiService
  {
    public async Task<Response<CaThiResponse>> GetCaThi(long id)
    {
      var caThi = await _caThiRepo.GetCaThiById(id);

      if (caThi == null)
        return new Response<CaThiResponse>
        {
          StatusCode = 400,
          Success = false,
          Errors = new[] { "Không tìm thấy ca thi" }
        };

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
using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Entity;
using Server.Model.Response;

namespace Server.Service
{
  public partial class CaThiService
  {
    public async Task<Response<List<CaThiResponse>>> GetDsCaThi(long idHocPhan)
    {
      var hocPhan = await _hocPhanRepo.GetHocPhanById(idHocPhan);

      if (hocPhan == null)
        return new Response<List<CaThiResponse>>
        {
          StatusCode = 400,
          Success = false,
          Errors = new[] { "Không tìm thấy học phần" }
        };

      var dsCaThi = _caThiRepo.GetAll(idHocPhan);
      var dsCaThiResponse = new List<CaThiResponse>();

      foreach (var caThi in dsCaThi)
      {
        var lopHoc = await _lopHocRepo.GetLopHocById(caThi.IdLopHoc);
        var deThi = await _deThiRepo.GetDeThiById(caThi.IdDeThi);
        var dsIdCauHoi = _deThiRepo.GetDsIdCauHoi(deThi.Id);
        var dsCauHoi = await _cauHoiRepo.GetMultipleCauHoiById(dsIdCauHoi);
        var deThiResponse = new DeThiResponse(deThi, dsCauHoi);
        var giamThi = await _taiKhoanRepo.GetTaiKhoanById(caThi.IdGiamThi);
        var caThiResponse = new CaThiResponse(caThi, lopHoc, deThiResponse, giamThi);
        dsCaThiResponse.Add(caThiResponse);
      }

      return new Response<List<CaThiResponse>>
      {
        StatusCode = 200,
        Success = true,
        Data = dsCaThiResponse
      };
    }
  }
}
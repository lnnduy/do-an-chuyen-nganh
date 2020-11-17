using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Model.Response;

namespace Server.Service
{
  public partial class DeThiService
  {
    public async Task<Response<List<DeThiResponse>>> GetDsDeThi(long idHocPhan)
    {
      var hocPhan = await _hocPhanRepo.GetHocPhanById(idHocPhan);

      if (hocPhan == null)
        return new Response<List<DeThiResponse>>
        {
          StatusCode = 400,
          Success = false,
          Errors = new[] { "Không tìm thấy học phần" }
        };

      var dsDeThi = _deThiRepo.GetAll(idHocPhan);
      var dsDeThiResponse = new List<DeThiResponse>();

      foreach (var deThi in dsDeThi)
      {
        var dsIdCauHoi = _deThiRepo.GetDsIdCauHoi(deThi.Id);
        var dsCauHoi = await _cauHoiRepo.GetMultipleCauHoiById(dsIdCauHoi);
        var deThiResponse = new DeThiResponse(deThi, dsCauHoi);
        dsDeThiResponse.Add(deThiResponse);
      }

      return new Response<List<DeThiResponse>>
      {
        StatusCode = 200,
        Success = true,
        Data = dsDeThiResponse
      };
    }
  }
}
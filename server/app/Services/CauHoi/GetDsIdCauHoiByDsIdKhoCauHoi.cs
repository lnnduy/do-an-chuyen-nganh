using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Model.Response;

namespace Server.Service
{
  public partial class CauHoiService
  {
    public Response<DsIdCauHoiClassifiedResponse> GetDsIdCauHoiByDsIdKhoCauHoi(List<long> dsIdKhoCauHoi)
    {
      var dsIdCauHoiClassifiedResponse = new DsIdCauHoiClassifiedResponse();

      foreach (var idKhoCauHoi in dsIdKhoCauHoi)
      {
        var dsCauHoi = _cauHoiRepo.GetAll(idKhoCauHoi);
        dsIdCauHoiClassifiedResponse.AddRange(dsCauHoi);
      }

      return new Response<DsIdCauHoiClassifiedResponse>
      {
        StatusCode = 200,
        Success = true,
        Data = dsIdCauHoiClassifiedResponse
      };
    }
  }
}
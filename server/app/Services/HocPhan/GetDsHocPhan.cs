using System.Collections.Generic;
using Server.Entity;
using Server.Model.Response;

namespace Server.Service
{
  public partial class HocPhanService
  {
    public Response<List<HocPhan>> GetDsHocPhan()
    {
      var dsHocPhan = _hocPhanRepo.GetAll();
      return new Response<List<HocPhan>>
      {
        StatusCode = 200,
        Success = true,
        Errors = null,
        Data = dsHocPhan
      };
    }
  }
}
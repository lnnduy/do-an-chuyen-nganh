using System.Collections.Generic;
using Server.Entity;
using Server.Model.Response;

namespace Server.Service
{
  public partial class LopHocService
  {
    public Response<List<LopHoc>> GetDsLopHoc()
    {
      var dsLopHoc = _lopHocRepo.GetAll();
      return new Response<List<LopHoc>>
      {
        StatusCode = 200,
        Success = true,
        Errors = null,
        Data = dsLopHoc
      };
    }
  }
}
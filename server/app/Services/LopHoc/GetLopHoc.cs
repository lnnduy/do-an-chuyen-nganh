using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Entity;
using Server.Model.Response;

namespace Server.Service
{
  public partial class LopHocService
  {
    public async Task<Response<LopHoc>> GetLopHoc(long id)
    {
      var lopHoc = await _lopHocRepo.GetLopHocById(id);
      return new Response<LopHoc>
      {
        StatusCode = 200,
        Success = true,
        Errors = null,
        Data = lopHoc
      };
    }
  }
}
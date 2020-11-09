using System.Threading.Tasks;
using Server.Entity;
using Server.Model.Request;
using Server.Model.Response;

namespace Server.Service
{
  public partial class LopHocService
  {
    public async Task<Response<LopHoc>> TaoLopHoc(TaoLopHocRequest request)
    {
      var lopHoc = new LopHoc
      {
        TenLop = request.TenLopHoc
      };
      var newLopHoc = await _lopHocRepo.CreateLopHoc(lopHoc);

      return new Response<LopHoc>
      {
        StatusCode = 201,
        Success = true,
        Errors = null,
        Data = newLopHoc
      };
    }
  }
}
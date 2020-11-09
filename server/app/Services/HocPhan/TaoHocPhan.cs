using System.Threading.Tasks;
using Server.Entity;
using Server.Model.Request;
using Server.Model.Response;

namespace Server.Service
{
  public partial class HocPhanService
  {
    public async Task<Response<HocPhan>> TaoHocPhan(TaoHocPhanRequest request)
    {
      var hocPhan = new HocPhan
      {
        TenHocPhan = request.TenHocPhan
      };
      var newHocPhan = await _hocPhanRepo.CreateHocPhan(hocPhan);

      return new Response<HocPhan>
      {
        StatusCode = 201,
        Success = true,
        Errors = null,
        Data = newHocPhan
      };
    }
  }
}
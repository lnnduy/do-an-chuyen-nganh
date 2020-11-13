using System.Threading.Tasks;
using Server.Entity;
using Server.Model.Response;

namespace Server.Service
{
  public partial class HocPhanService
  {
    public async Task<Response<HocPhan>> GetHocPhan(long id)
    {
      var hocPhan = await _hocPhanRepo.GetHocPhanById(id);
      return new Response<HocPhan>
      {
        StatusCode = 200,
        Success = true,
        Data = hocPhan
      };
    }
  }
}
using System.Threading.Tasks;
using Server.Model.Response;

namespace Server.Service
{
  public partial class HocPhanService
  {
    public async Task<Response> XoaHocPhan(long id)
    {
      var existsHocPhan = await _hocPhanRepo.GetHocPhanById(id);

      if (existsHocPhan == null)
        return new Response
        {
          StatusCode = 400,
          Success = false,
          Errors = new[] { "Không tìm thấy học phần" }
        };

      await _hocPhanRepo.DeleteHocPhan(existsHocPhan);

      return new Response
      {
        StatusCode = 204,
        Success = true,
        Errors = null
      };
    }
  }
}
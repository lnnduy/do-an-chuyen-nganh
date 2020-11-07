using System.Threading.Tasks;
using Server.Model.Response;

namespace Server.Service
{
  public partial class TaiKhoanService
  {
    public async Task<Response<AuthResponse>> GetAuthData(long idTaiKhoan)
    {
      var taiKhoan = await _taiKhoanRepo.GetTaiKhoanById(idTaiKhoan);

      if (taiKhoan == null)
        return new Response<AuthResponse>
        {
          Success = false,
          StatusCode = 404,
          Errors = null,
          Data = null
        };
      var data = new AuthResponse(null, taiKhoan);

      return new Response<AuthResponse>
      {
        Success = true,
        StatusCode = 200,
        Errors = null,
        Data = data
      };
    }
  }
}
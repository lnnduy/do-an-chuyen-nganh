using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Server.Model.Request;
using Server.Model.Response;
using Server.Repository;
using SimpleHashing.Net;

namespace Server.Service
{
  public interface ITaiKhoanService
  {
    Response<AuthResponse> SignIn(SignInRequest request);
    Task<Response<AuthResponse>> GetAuthData(long idTaiKhoan);
  }

  public class TaiKhoanService : ITaiKhoanService
  {
    private readonly TaiKhoanRepository _taiKhoanRepo = new TaiKhoanRepository();
    private readonly IConfiguration _config;

    public TaiKhoanService(IConfiguration config)
    {
      _config = config;
    }

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

    public Response<AuthResponse> SignIn(SignInRequest request)
    {
      var taiKhoan = _taiKhoanRepo.GetTaiKhoanByUsername(request.Username);
      ISimpleHash simpleHash = new SimpleHash();

      if (taiKhoan == null || !simpleHash.Verify(request.MatKhau, taiKhoan.MatKhau))
        return new Response<AuthResponse>
        {
          Success = false,
          StatusCode = 400,
          Errors = new[] { "Sai tài khoản hoặc mật khẩu" }
        };

      var jwtService = new JwtService(_config);
      var token = jwtService.GenerateSecurityToken(taiKhoan);
      var data = new AuthResponse(token, taiKhoan);

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
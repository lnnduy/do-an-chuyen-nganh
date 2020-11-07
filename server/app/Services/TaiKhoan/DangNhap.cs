using Server.Model.Request;
using Server.Model.Response;
using SimpleHashing.Net;

namespace Server.Service
{
  public partial class TaiKhoanService
  {
    public Response<AuthResponse> DangNhap(SignInRequest request)
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
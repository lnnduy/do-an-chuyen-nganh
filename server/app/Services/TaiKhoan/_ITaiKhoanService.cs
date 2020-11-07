using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Model.Request;
using Server.Model.Response;

namespace Server.Service
{
  public interface ITaiKhoanService
  {
    Response<AuthResponse> DangNhap(SignInRequest request);
    Task<Response<AuthResponse>> GetAuthData(long idTaiKhoan);
    Response<List<ThongTinTaiKhoan>> GetDsTaiKhoan();
    Task<Response<ThongTinTaiKhoan>> TaoTaiKhoan(TaoTaiKhoanRequest request);
    Task<Response<ThongTinTaiKhoan>> CapNhatTaiKhoan(long id, CapNhatTaiKhoanRequest request);
    Task<Response> XoaTaiKhoan(long id);
  }
}
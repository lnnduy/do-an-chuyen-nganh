using System.Threading.Tasks;
using Server.Entity;
using Server.Model.Request;
using Server.Model.Response;

namespace Server.Service
{
  public partial class TaiKhoanService
  {
    public async Task<Response<ThongTinTaiKhoan>> TaoTaiKhoan(TaoTaiKhoanRequest request)
    {
      var existsTaiKhoan = _taiKhoanRepo.GetTaiKhoanByUsername(request.Username);

      if (existsTaiKhoan != null) return new Response<ThongTinTaiKhoan>
      {
        StatusCode = 400,
        Success = false,
        Errors = new[] { "Tên tài khoản này đã được sử dụng" }
      };

      var taiKhoan = new TaiKhoan
      {
        Username = request.Username,
        MatKhau = request.MatKhau,
        QuyenTruyCap = request.QuyenTruyCap,
      };
      var newTaiKhoan = await _taiKhoanRepo.CreateTaiKhoan(taiKhoan);
      var data = new ThongTinTaiKhoan(newTaiKhoan);

      return new Response<ThongTinTaiKhoan>
      {
        StatusCode = 201,
        Success = true,
        Errors = null,
        Data = data
      };
    }
  }
}
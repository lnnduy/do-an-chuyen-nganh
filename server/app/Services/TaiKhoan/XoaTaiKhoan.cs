using System.Threading.Tasks;
using Server.Enum;
using Server.Model.Response;

namespace Server.Service
{
  public partial class TaiKhoanService
  {
    public async Task<Response> XoaTaiKhoan(long id)
    {
      var taiKhoan = await _taiKhoanRepo.GetTaiKhoanById(id);

      if (taiKhoan == null)
        return new Response
        {
          StatusCode = 404,
          Errors = new[] { "Không tìm thấy tài khoản" },
          Success = false
        };

      if (taiKhoan.QuyenTruyCap == QuyenTruyCap.QuanTriVien)
        return new Response
        {
          StatusCode = 400,
          Success = false,
          Errors = new[] { "Không thể xoá tài khoản quản trị viên" }
        };

      await _taiKhoanRepo.DeleteTaiKhoan(taiKhoan);

      return new Response
      {
        StatusCode = 204,
        Success = true,
        Errors = null
      };
    }
  }
}
using System.Threading.Tasks;
using Server.Model.Request;
using Server.Model.Response;

namespace Server.Service
{
  public partial class TaiKhoanService
  {
    public async Task<Response<ThongTinTaiKhoan>> CapNhatTaiKhoan(long id, CapNhatTaiKhoanRequest request)
    {
      var taiKhoan = await _taiKhoanRepo.GetTaiKhoanById(id);

      if (taiKhoan == null)
        return new Response<ThongTinTaiKhoan>
        {
          StatusCode = 400,
          Success = false,
          Errors = new[] { "Không tìm thấy tài khoản" }
        };

      taiKhoan.HoTen = string.IsNullOrWhiteSpace(request.HoTen) ? "" : request.HoTen;
      taiKhoan.Email = string.IsNullOrWhiteSpace(request.Email) ? "" : request.Email;
      taiKhoan.GioiTinh = string.IsNullOrWhiteSpace(request.GioiTinh) ? "" : request.GioiTinh;
      taiKhoan.SoDienThoai = string.IsNullOrWhiteSpace(request.SoDienThoai) ? "" : request.SoDienThoai;

      var updatedTaiKhoan = await _taiKhoanRepo.UpdateTaiKhoan(taiKhoan);
      var data = new ThongTinTaiKhoan(updatedTaiKhoan);

      return new Response<ThongTinTaiKhoan>
      {
        StatusCode = 200,
        Success = true,
        Errors = null,
        Data = data
      };
    }
  }
}
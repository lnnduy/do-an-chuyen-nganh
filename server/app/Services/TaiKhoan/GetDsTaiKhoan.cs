using System.Collections.Generic;
using Server.Model.Response;

namespace Server.Service
{
  public partial class TaiKhoanService
  {
    public Response<List<ThongTinTaiKhoan>> GetDsTaiKhoan()
    {
      var dsTaiKhoan = _taiKhoanRepo.GetAll();
      var data = new List<ThongTinTaiKhoan>();

      foreach (var taiKhoan in dsTaiKhoan)
        data.Add(new ThongTinTaiKhoan(taiKhoan));

      return new Response<List<ThongTinTaiKhoan>>
      {
        StatusCode = 200,
        Success = true,
        Errors = null,
        Data = data
      };
    }
  }
}
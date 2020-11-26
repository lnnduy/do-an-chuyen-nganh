using System.Collections.Generic;
using Server.Entity;
using Server.Model.Response;

namespace Server.Service
{
  public partial class SinhVienService
  {
    public Response<SinhVien> GetSinhVienByMssv(string mssv)
    {
      var sinhVien = _sinhVienRepo.GetSinhVienByMssv(mssv);

      return new Response<SinhVien>
      {
        StatusCode = 200,
        Success = true,
        Errors = null,
        Data = sinhVien
      };
    }
  }
}
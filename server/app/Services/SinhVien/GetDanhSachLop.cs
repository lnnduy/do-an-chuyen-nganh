using System.Collections.Generic;
using Server.Entity;
using Server.Model.Response;

namespace Server.Service
{
  public partial class SinhVienService
  {
    public Response<List<SinhVien>> GetDanhSachLop(long idLopHoc)
    {
      var dsSinhVien = _sinhVienRepo.GetAllInLopHoc(idLopHoc);

      return new Response<List<SinhVien>>
      {
        StatusCode = 200,
        Success = true,
        Errors = null,
        Data = dsSinhVien
      };
    }
  }
}
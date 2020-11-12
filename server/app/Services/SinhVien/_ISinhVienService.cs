using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Entity;
using Server.Model.Request;
using Server.Model.Response;

namespace Server.Service
{
  public interface ISinhVienService
  {
    Response<List<SinhVien>> GetDanhSachLop(long idLopHoc);
    Task<Response<SinhVien>> ThemSinhVienVaoLop(long idLopHoc, TaoSinhVienRequest request);
  }
}
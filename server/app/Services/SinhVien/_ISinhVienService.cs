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
    Response<SinhVien> GetSinhVienByMssv(string mssv);
    Task<Response<SinhVien>> ThemSinhVienVaoLop(long idLopHoc, TaoSinhVienRequest request);
    Task<Response<SinhVien>> CapNhatSinhVien(long idSinhVien, TaoSinhVienRequest request);
    Task<Response> XoaSinhVien(long idSinhVien);
  }
}
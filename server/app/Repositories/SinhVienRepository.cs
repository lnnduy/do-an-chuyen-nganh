using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Entity;

namespace Server.Repository
{
  public class SinhVienRepository
  {
    private readonly ServerContext _context = new ServerContext();

    public List<SinhVien> GetAllInLopHoc(long idLopHoc)
    {
      var dsSinhVien = _context.SinhVienContext.Where(sv => sv.IdLopHoc == idLopHoc).ToList();
      return dsSinhVien;
    }

    public async Task<SinhVien> GetSinhVienById(long id)
    {
      return await _context.SinhVienContext.FindAsync(id);
    }

    public async Task<SinhVien> CreateSinhVien(SinhVien sinhVien)
    {
      await _context.SinhVienContext.AddAsync(sinhVien);
      await _context.SaveChangesAsync();
      return sinhVien;
    }

    public async Task<SinhVien> UpdateSinhVien(SinhVien sinhVien)
    {
      _context.SinhVienContext.Update(sinhVien);
      await _context.SaveChangesAsync();
      return sinhVien;
    }

    public async Task<SinhVien> DeleteSinhVien(SinhVien sinhVien)
    {
      _context.SinhVienContext.Remove(sinhVien);
      await _context.SaveChangesAsync();
      return sinhVien;
    }
  }
}
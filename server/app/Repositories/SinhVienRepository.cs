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

    public async Task<SinhVien> CreateSinhVien(SinhVien sinhVien)
    {
      await _context.SinhVienContext.AddAsync(sinhVien);
      await _context.SaveChangesAsync();
      return sinhVien;
    }
  }
}
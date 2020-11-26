using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Entity;

namespace Server.Repository
{
  public class ThiSinhRepository
  {
    private readonly ServerContext _context = new ServerContext();

    public List<ThiSinh> GetAllThiSinhInCaThi(long idCaThi)
    {
      var dsThiSinh = _context.ThiSinhContext.Where(ts => ts.IdCaThi == idCaThi).ToList();
      return dsThiSinh;
    }

    public async Task<ThiSinh> GetThiSinhById(long idCaThi, long idSinhVien)
    {
      var thiSinh = await _context.ThiSinhContext.FindAsync(new object[] { idSinhVien, idCaThi });
      return thiSinh;
    }

    public async Task<ThiSinh> CreateThiSinh(ThiSinh thiSinh)
    {
      await _context.ThiSinhContext.AddAsync(thiSinh);
      await _context.SaveChangesAsync();
      return thiSinh;
    }

    public async Task<ThiSinh> UpdateThiSinh(ThiSinh thiSinh)
    {
      _context.ThiSinhContext.Update(thiSinh);
      await _context.SaveChangesAsync();
      return thiSinh;
    }

    public async Task DeleteThiSinh(ThiSinh thiSinh)
    {
      _context.ThiSinhContext.Remove(thiSinh);
      await _context.SaveChangesAsync();
    }
  }
}
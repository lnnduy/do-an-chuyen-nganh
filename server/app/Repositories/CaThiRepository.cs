using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Entity;

namespace Server.Repository
{
  public class CaThiRepository
  {
    private readonly ServerContext _context = new ServerContext();

    public List<CaThi> GetAll(long idHocPhan)
    {
      var dsCaThi = _context.CaThiContext.Where(ct => ct.IdHocPhan == idHocPhan).ToList();
      return dsCaThi;
    }

    public async Task<CaThi> GetCaThiById(long id)
    {
      var caThi = await _context.CaThiContext.FindAsync(id);
      return caThi;
    }

    public async Task<CaThi> CreateCaThi(CaThi caThi)
    {
      await _context.CaThiContext.AddAsync(caThi);
      await _context.SaveChangesAsync();
      return caThi;
    }

    public async Task<CaThi> UpdateCaThi(CaThi caThi)
    {
      _context.CaThiContext.Update(caThi);
      await _context.SaveChangesAsync();
      return caThi;
    }

    public async Task DeleteCaThi(CaThi caThi)
    {
      _context.CaThiContext.Remove(caThi);
      await _context.SaveChangesAsync();
    }
  }
}
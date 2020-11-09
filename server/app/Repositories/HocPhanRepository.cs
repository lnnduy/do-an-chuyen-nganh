using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Entity;

namespace Server.Repository
{
  public class HocPhanRepository
  {
    private readonly ServerContext _context = new ServerContext();

    public List<HocPhan> GetAll()
    {
      var dsHocPhan = _context.HocPhanContext.ToList();
      return dsHocPhan;
    }

    public async Task<HocPhan> CreateHocPhan(HocPhan hocPhan)
    {
      await _context.HocPhanContext.AddAsync(hocPhan);
      await _context.SaveChangesAsync();
      return hocPhan;
    }

    public async Task<HocPhan> UpdateHocPhan(HocPhan hocPhan)
    {
      _context.HocPhanContext.Update(hocPhan);
      await _context.SaveChangesAsync();
      return hocPhan;
    }

    public async Task<HocPhan> FindHocPhanById(long id)
    {
      return await _context.HocPhanContext.FindAsync(id);
    }

    public async Task DeleteHocPhan(HocPhan hocPhan)
    {
      _context.HocPhanContext.Remove(hocPhan);
      await _context.SaveChangesAsync();
    }
  }
}
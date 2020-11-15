using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Entity;

namespace Server.Repository
{
  public class DeThiRepository
  {
    private readonly ServerContext _context = new ServerContext();

    public List<DeThi> GetAll(long idHocPhan)
    {
      var dsDeThi = _context.DeThiContext.Where(dt => dt.IdHocPhan == idHocPhan).ToList();
      return dsDeThi;
    }

    public async Task<DeThi> GetDeThiById(long id)
    {
      var deThi = await _context.DeThiContext.FindAsync(id);

      deThi.DsCauHoi = _context.ChiTietDeThiContext.Where(ctdt => ctdt.IdDeThi == id).ToList();

      return deThi;
    }

    public List<long> GetDsIdCauHoi(long id)
    {
      var dsIdCauHoi = _context.ChiTietDeThiContext
                          .Where(ctdh => ctdh.IdDeThi == id)
                          .Select(ctdt => ctdt.IdCauHoi)
                          .ToList();
      return dsIdCauHoi;
    }

    public async Task<DeThi> CreateDeThi(DeThi deThi)
    {
      await _context.DeThiContext.AddAsync(deThi);
      await _context.SaveChangesAsync();

      return deThi;
    }

    public async Task<DeThi> UpdateDethi(DeThi deThi)
    {
      _context.DeThiContext.Update(deThi);
      await _context.SaveChangesAsync();

      return deThi;
    }

    public async Task DeleteDeThi(DeThi deThi)
    {
      _context.ChiTietDeThiContext.RemoveRange(deThi.DsCauHoi);
      await _context.SaveChangesAsync();
      _context.DeThiContext.Remove(deThi);
      await _context.SaveChangesAsync();
    }
  }
}
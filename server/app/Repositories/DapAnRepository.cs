using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Entity;

namespace Server.Repository
{
  public class DapAnRepository
  {
    private readonly ServerContext _context = new ServerContext();

    public List<DapAn> GetAll(long idCauHoi)
    {
      var dsDapAn = _context.DapAnContext.Where(da => da.IdCauHoi == idCauHoi).ToList();
      return dsDapAn;
    }

    public async Task<List<DapAn>> FindMultipleDapAnById(List<long> dsId)
    {
      var dsDapAn = new List<DapAn>();

      foreach (var id in dsId)
      {
        var dapAn = await _context.DapAnContext.FindAsync(id);
        if (dapAn != null) dsDapAn.Add(dapAn);
      }

      return dsDapAn;
    }

    public async Task<List<DapAn>> CreateMultipleDapAn(List<DapAn> dsDapAn)
    {
      await _context.DapAnContext.AddRangeAsync(dsDapAn);
      await _context.SaveChangesAsync();
      return dsDapAn;
    }

    public async Task<List<DapAn>> UpdateMultipleDapAn(List<DapAn> dsDapAn)
    {
      _context.DapAnContext.UpdateRange(dsDapAn);
      await _context.SaveChangesAsync();
      return dsDapAn;
    }

    public async Task DeleteMultipleDapAn(List<DapAn> dsDapAn)
    {
      _context.DapAnContext.RemoveRange(dsDapAn);
      await _context.SaveChangesAsync();
    }
  }
}
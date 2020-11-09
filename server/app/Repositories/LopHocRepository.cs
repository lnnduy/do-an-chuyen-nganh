using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Entity;

namespace Server.Repository
{
  public class LopHocRepository
  {
    private readonly ServerContext _context = new ServerContext();

    public List<LopHoc> GetAll()
    {
      var dsLopHoc = _context.LopHocContext.ToList();
      return dsLopHoc;
    }
    public async Task<LopHoc> CreateLopHoc(LopHoc lopHoc)
    {
      await _context.LopHocContext.AddAsync(lopHoc);
      await _context.SaveChangesAsync();
      return lopHoc;
    }
    public async Task<LopHoc> UpdateLopHoc(LopHoc lopHoc)
    {
      _context.LopHocContext.Update(lopHoc);
      await _context.SaveChangesAsync();
      return lopHoc;
    }
    public async Task<LopHoc> FindLopHocById(long id)
    {
      return await _context.LopHocContext.FindAsync(id);
    }

    public async Task DeleteLopHoc(LopHoc lopHoc)
    {
      _context.LopHocContext.Remove(lopHoc);
      await _context.SaveChangesAsync();
    }
  }
}
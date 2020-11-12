using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Entity;

namespace Server.Repository
{
  public class KhoCauHoiRepository
  {
    private readonly ServerContext _context = new ServerContext();

    public List<KhoCauHoi> GetAll(long idHocPhan)
    {
      var dsKhoCauHoi = _context.KhoCauHoiContext.Where(kch => kch.IdHocPhan == idHocPhan).ToList();
      return dsKhoCauHoi;
    }

    public async Task<KhoCauHoi> GetKhoCauHoiById(long id)
    {
      var khoCauHoi = await _context.KhoCauHoiContext.FindAsync(id);
      return khoCauHoi;
    }

    public async Task<KhoCauHoi> CreateKhoCauHoi(KhoCauHoi khoCauHoi)
    {
      await _context.KhoCauHoiContext.AddAsync(khoCauHoi);
      await _context.SaveChangesAsync();
      return khoCauHoi;
    }

    public async Task<KhoCauHoi> UpdateKhoCauHoi(KhoCauHoi khoCauHoi)
    {
      _context.KhoCauHoiContext.Update(khoCauHoi);
      await _context.SaveChangesAsync();
      return khoCauHoi;
    }

    public async Task DeleteKhoCauHoi(KhoCauHoi khoCauHoi)
    {
      _context.KhoCauHoiContext.Remove(khoCauHoi);
      await _context.SaveChangesAsync();
    }
  }
}
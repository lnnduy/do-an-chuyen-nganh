using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Entity;
using Server.Enum;

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

    public async Task<List<CaThi>> GetAllCaThiSanSang(long idSinhVien)
    {
      var dsIdCaThi = _context.ThiSinhContext.Where(ts => ts.IdSinhVien == idSinhVien)
                                              .Select(ts => ts.IdCaThi)
                                              .ToList();
      var dsCaThi = new List<CaThi>();

      foreach (var idCaThi in dsIdCaThi)
      {
        var caThi = await _context.CaThiContext.FindAsync(idCaThi);
        if (caThi != null)
          dsCaThi.Add(caThi);
      }

      return dsCaThi;
    }

    public List<CaThi> GetAllCaThiDaNhan(long idTaiKhoan)
    {
      var dsCaThi = _context.CaThiContext.Where(ct => ct.IdGiamThi == idTaiKhoan)
                                          .Where(ct => ct.TrangThai != TrangThaiCaThi.DaKetThuc)
                                          .ToList();

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
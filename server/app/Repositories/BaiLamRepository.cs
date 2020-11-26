using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Entity;

namespace Server.Repository
{
  public class BaiLamRepository
  {
    private readonly ServerContext _context = new ServerContext();

    public List<BaiLam> GetAll(long idCaThi, long idSinhVien)
    {
      var dsBaiLam = _context.BaiLamContext.Where(bl => bl.IdCaThi == idCaThi)
                                            .Where(bl => bl.IdSinhVien == idSinhVien)
                                            .ToList();
      return dsBaiLam;
    }

    public async Task<BaiLam> GetBaiLamById(long idCaThi, long idSinhVien, long idCauHoi, long idDapAn)
    {
      var baiLam = await _context.BaiLamContext.FindAsync(new object[] { idCaThi, idSinhVien, idCauHoi, idDapAn });
      return baiLam;
    }

    public BaiLam GetBaiLamById(long idCaThi, long idSinhVien, long idCauHoi)
    {
      var baiLam = _context.BaiLamContext.Where(bl => bl.IdCaThi == idCaThi)
                                          .Where(bl => bl.IdSinhVien == idSinhVien)
                                          .Where(bl => bl.IdCauHoi == idCauHoi)
                                          .FirstOrDefault();
      return baiLam;
    }

    public async Task CreateBaiLam(BaiLam baiLam)
    {
      await _context.BaiLamContext.AddAsync(baiLam);
      await _context.SaveChangesAsync();
    }

    public async Task DeleteBaiLam(BaiLam baiLam)
    {
      _context.BaiLamContext.Remove(baiLam);
      await _context.SaveChangesAsync();
    }
  }
}
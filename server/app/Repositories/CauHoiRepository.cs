using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Server.Entity;

namespace Server.Repository
{
  public class CauHoiRepository
  {
    private readonly ServerContext _context = new ServerContext();
    private readonly DapAnRepository _dapAnRepository = new DapAnRepository();

    public List<CauHoi> GetAll(long idKhoCauHoi)
    {
      var dsCauHoi = _context.CauHoiContext.Where(ch => ch.IdKhoCauHoi == idKhoCauHoi).ToList();

      foreach (var cauHoi in dsCauHoi)
      {
        var dsDapAn = _dapAnRepository.GetAll(cauHoi.Id);
        cauHoi.DsDapAn = dsDapAn;
      }

      return dsCauHoi;
    }

    public async Task<CauHoi> GetCauHoiById(long id)
    {
      var cauHoi = await _context.CauHoiContext.FindAsync(id);
      return cauHoi;
    }

    public async Task<CauHoi> CreateCauHoi(CauHoi cauHoi, List<DapAn> dsDapAn)
    {
      await _context.CauHoiContext.AddAsync(cauHoi);
      await _context.SaveChangesAsync();

      foreach (var dapAn in dsDapAn)
      {
        dapAn.IdCauHoi = cauHoi.Id;
      }

      await _dapAnRepository.CreateMultipleDapAn(dsDapAn);
      cauHoi.DsDapAn = dsDapAn;

      return cauHoi;
    }

    public async Task<CauHoi> UpdateCauHoi(
      CauHoi cauHoi,
      List<DapAn> dsDapAnMoi,
      List<DapAn> dsDapAnCanCapNhat,
      List<DapAn> dsDapAnCanXoa
    )
    {
      await _dapAnRepository.CreateMultipleDapAn(dsDapAnMoi);
      await _dapAnRepository.UpdateMultipleDapAn(dsDapAnCanCapNhat);
      await _dapAnRepository.DeleteMultipleDapAn(dsDapAnCanXoa);
      _context.CauHoiContext.Update(cauHoi);
      await _context.SaveChangesAsync();
      return cauHoi;
    }

    public async Task DeleteCauHoi(CauHoi cauHoi)
    {
      await _dapAnRepository.DeleteMultipleDapAn(cauHoi.DsDapAn);
      _context.Entry(cauHoi).State = EntityState.Deleted;
      _context.CauHoiContext.Remove(cauHoi);
      await _context.SaveChangesAsync();
    }
  }
}
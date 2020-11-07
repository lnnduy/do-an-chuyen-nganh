using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Entities;
using SimpleHashing.Net;

namespace Server.Repository
{
  public class TaiKhoanRepository
  {
    private readonly ServerContext _context = new ServerContext();

    public TaiKhoan GetTaiKhoanByUsername(string username)
    {
      var taiKhoan = _context.TaiKhoanContext.Where(tk => tk.Username == username).FirstOrDefault();
      return taiKhoan;
    }

    public async Task<TaiKhoan> GetTaiKhoanById(long idTaiKhoan)
    {
      var taiKhoan = await _context.TaiKhoanContext.FindAsync(idTaiKhoan);
      return taiKhoan;
    }

    public List<TaiKhoan> GetAll()
    {
      var dsTaiKhoan = _context.TaiKhoanContext.ToList();
      return dsTaiKhoan;
    }

    public async Task<TaiKhoan> CreateTaiKhoan(TaiKhoan taiKhoan)
    {
      ISimpleHash simpleHash = new SimpleHash();
      var hashedPassword = simpleHash.Compute(string.IsNullOrWhiteSpace(taiKhoan.MatKhau) ? "123456" : taiKhoan.MatKhau);

      var newTaiKhoan = new TaiKhoan
      {
        Username = taiKhoan.Username,
        MatKhau = hashedPassword,
        QuyenTruyCap = taiKhoan.QuyenTruyCap,
      };

      await _context.TaiKhoanContext.AddAsync(newTaiKhoan);
      await _context.SaveChangesAsync();

      return newTaiKhoan;
    }

    public async Task<TaiKhoan> UpdateTaiKhoan(TaiKhoan taiKhoan)
    {
      _context.TaiKhoanContext.Update(taiKhoan);
      await _context.SaveChangesAsync();
      return taiKhoan;
    }

    public async Task DeleteTaiKhoan(TaiKhoan taiKhoan)
    {
      _context.TaiKhoanContext.Remove(taiKhoan);
      await _context.SaveChangesAsync();
    }
  }
}
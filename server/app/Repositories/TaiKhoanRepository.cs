using System.Linq;
using System.Threading.Tasks;
using Server.Entities;

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
  }
}
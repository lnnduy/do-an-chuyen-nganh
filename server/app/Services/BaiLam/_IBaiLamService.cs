using System.Threading.Tasks;
using Server.Model.Response;

namespace Server.Service
{
  public interface IBaiLamService
  {
    Task<Response> CapNhatBaiLam(long idCaThi, long idSinhVien, long idCauHoi, long idBaiLam);
    Task<Response> XoaBaiLam(long idCaThi, long idSinhVien, long idCauHoi, long idBaiLam);
  }
}
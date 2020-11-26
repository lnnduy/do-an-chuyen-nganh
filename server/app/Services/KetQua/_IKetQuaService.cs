using System.Threading.Tasks;
using Server.Model.Response;

namespace Server.Service
{
  public interface IKetQuaService
  {
    Task<Response<KetQuaResponse>> CaThi_ThiSinh(long idCaThi, long idSinhVien);
    Task<Response<KetQuaCaThiResponse>> CaThi(long idCaThi);
  }
}
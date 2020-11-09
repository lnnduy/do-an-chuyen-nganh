using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Model.Request;
using Server.Service;

namespace Server.Controller
{
  [Authorize]
  [ApiController]
  [Route("api/hoc-phan")]
  public class HocPhanController : ControllerBase
  {
    private readonly IHocPhanService _hocPhanService;

    public HocPhanController(IHocPhanService hocPhanService)
    {
      _hocPhanService = hocPhanService;
    }

    [HttpGet("")]
    public IActionResult GetDsHocPhan()
    {
      var claim = User.Claims.FirstOrDefault(c => c.Type == "id");

      if (!User.Identity.IsAuthenticated || claim == null)
        return Unauthorized();

      var serviceResult = _hocPhanService.GetDsHocPhan();

      return Ok(serviceResult);
    }

    [HttpPost("")]
    public async Task<IActionResult> TaoHocPhan(TaoHocPhanRequest request)
    {
      var claim = User.Claims.FirstOrDefault(c => c.Type == "id");

      if (!User.Identity.IsAuthenticated || claim == null)
        return Unauthorized();

      var serviceResult = await _hocPhanService.TaoHocPhan(request);

      return Ok(serviceResult);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> CapNhatHocPhan(long id, TaoHocPhanRequest request)
    {
      var claim = User.Claims.FirstOrDefault(c => c.Type == "id");

      if (!User.Identity.IsAuthenticated || claim == null)
        return Unauthorized();

      var serviceResult = await _hocPhanService.CapNhatHocPhan(id, request);

      return Ok(serviceResult);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> XoaHocPhan(long id)
    {
      var claim = User.Claims.FirstOrDefault(c => c.Type == "id");

      if (!User.Identity.IsAuthenticated || claim == null)
        return Unauthorized();

      var serviceResult = await _hocPhanService.XoaHocPhan(id);

      return Ok(serviceResult);
    }
  }
}
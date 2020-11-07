using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Enum;
using Server.Model.Request;
using Server.Service;

namespace Server.Controller
{
  [Authorize]
  [ApiController]
  [Route("api/tai-khoan")]
  public class TaiKhoanController : ControllerBase
  {
    private readonly ITaiKhoanService _taiKhoanService;

    public TaiKhoanController(ITaiKhoanService taiKhoanService)
    {
      _taiKhoanService = taiKhoanService;
    }

    [AllowAnonymous]
    [HttpPost("dang-nhap")]
    public IActionResult SignIn(SignInRequest request)
    {
      var serviceResult = _taiKhoanService.DangNhap(request);
      return Ok(serviceResult);
    }

    [HttpPost("")]
    [Authorize(Roles = QuyenTruyCap.QuanTriVien)]
    public async Task<IActionResult> TaoTaiKhoan(TaoTaiKhoanRequest request)
    {
      var claim = User.Claims.FirstOrDefault(c => c.Type == "id");

      if (!User.Identity.IsAuthenticated || claim == null)
        return Unauthorized();

      var idTaiKhoan = Convert.ToInt64(claim.Value);
      var serviceResult = await _taiKhoanService.TaoTaiKhoan(request);

      return Ok(serviceResult);
    }

    [HttpGet("")]
    public async Task<IActionResult> Authenticate()
    {
      var claim = User.Claims.FirstOrDefault(c => c.Type == "id");

      if (!User.Identity.IsAuthenticated || claim == null)
        return Unauthorized();

      var idTaiKhoan = Convert.ToInt64(claim.Value);
      var serviceResult = await _taiKhoanService.GetAuthData(idTaiKhoan);

      return Ok(serviceResult);
    }

    [HttpGet("list")]
    public IActionResult GetDsTaiKhoan()
    {
      var claim = User.Claims.FirstOrDefault(c => c.Type == "id");

      if (!User.Identity.IsAuthenticated || claim == null)
        return Unauthorized();

      var idTaiKhoan = Convert.ToInt64(claim.Value);
      var serviceResult = _taiKhoanService.GetDsTaiKhoan();

      return Ok(serviceResult);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = QuyenTruyCap.QuanTriVien)]
    public async Task<IActionResult> CapNhatTaiKhoan(long id, CapNhatTaiKhoanRequest request)
    {
      var claim = User.Claims.FirstOrDefault(c => c.Type == "id");

      if (!User.Identity.IsAuthenticated || claim == null)
        return Unauthorized();

      var idTaiKhoan = Convert.ToInt64(claim.Value);
      var serviceResult = await _taiKhoanService.CapNhatTaiKhoan(id, request);

      return Ok(serviceResult);
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = QuyenTruyCap.QuanTriVien)]
    public async Task<IActionResult> XoaTaiKhoan(long id)
    {
      var claim = User.Claims.FirstOrDefault(c => c.Type == "id");

      if (!User.Identity.IsAuthenticated || claim == null)
        return Unauthorized();

      var idTaiKhoan = Convert.ToInt64(claim.Value);
      var serviceResult = await _taiKhoanService.XoaTaiKhoan(id);

      return Ok(serviceResult);
    }
  }
}
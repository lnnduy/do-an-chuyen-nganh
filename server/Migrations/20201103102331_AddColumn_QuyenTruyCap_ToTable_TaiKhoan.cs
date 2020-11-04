using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class AddColumn_QuyenTruyCap_ToTable_TaiKhoan : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "QuyenTruyCap",
                table: "TaiKhoan",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "QuyenTruyCap",
                table: "TaiKhoan");
        }
    }
}

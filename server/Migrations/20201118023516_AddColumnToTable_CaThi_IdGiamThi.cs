using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class AddColumnToTable_CaThi_IdGiamThi : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "IdGiamThi",
                table: "CaThi",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_CaThi_IdGiamThi",
                table: "CaThi",
                column: "IdGiamThi");

            migrationBuilder.AddForeignKey(
                name: "FK_GiamThi_CaThi",
                table: "CaThi",
                column: "IdGiamThi",
                principalTable: "TaiKhoan",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GiamThi_CaThi",
                table: "CaThi");

            migrationBuilder.DropIndex(
                name: "IX_CaThi_IdGiamThi",
                table: "CaThi");

            migrationBuilder.DropColumn(
                name: "IdGiamThi",
                table: "CaThi");
        }
    }
}

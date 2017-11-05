namespace PlasticManufacturer.InfraStructure.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class correcaoFkEmployee : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Employees", "City_Id", "dbo.Cities");
            DropForeignKey("dbo.Employees", "Department_Id", "dbo.Departments");
            DropForeignKey("dbo.Employees", "Gender_Id", "dbo.Genders");
            DropForeignKey("dbo.Employees", "MaritalStatus_Id", "dbo.MaritalStatus");
            DropForeignKey("dbo.Employees", "State_Id", "dbo.States");
            DropForeignKey("dbo.Employees", "Title_Id", "dbo.Titles");
            DropIndex("dbo.Employees", new[] { "City_Id" });
            DropIndex("dbo.Employees", new[] { "Department_Id" });
            DropIndex("dbo.Employees", new[] { "Gender_Id" });
            DropIndex("dbo.Employees", new[] { "MaritalStatus_Id" });
            DropIndex("dbo.Employees", new[] { "State_Id" });
            DropIndex("dbo.Employees", new[] { "Title_Id" });
            AlterColumn("dbo.Employees", "City_Id", c => c.Int(nullable: false));
            AlterColumn("dbo.Employees", "Department_Id", c => c.Int(nullable: false));
            AlterColumn("dbo.Employees", "Gender_Id", c => c.Int(nullable: false));
            AlterColumn("dbo.Employees", "MaritalStatus_Id", c => c.Int(nullable: false));
            AlterColumn("dbo.Employees", "State_Id", c => c.Int(nullable: false));
            AlterColumn("dbo.Employees", "Title_Id", c => c.Int(nullable: false));
            CreateIndex("dbo.Employees", "Gender_Id");
            CreateIndex("dbo.Employees", "MaritalStatus_Id");
            CreateIndex("dbo.Employees", "City_Id");
            CreateIndex("dbo.Employees", "State_Id");
            CreateIndex("dbo.Employees", "Title_Id");
            CreateIndex("dbo.Employees", "Department_Id");
            AddForeignKey("dbo.Employees", "City_Id", "dbo.Cities", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Employees", "Department_Id", "dbo.Departments", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Employees", "Gender_Id", "dbo.Genders", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Employees", "MaritalStatus_Id", "dbo.MaritalStatus", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Employees", "State_Id", "dbo.States", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Employees", "Title_Id", "dbo.Titles", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Employees", "Title_Id", "dbo.Titles");
            DropForeignKey("dbo.Employees", "State_Id", "dbo.States");
            DropForeignKey("dbo.Employees", "MaritalStatus_Id", "dbo.MaritalStatus");
            DropForeignKey("dbo.Employees", "Gender_Id", "dbo.Genders");
            DropForeignKey("dbo.Employees", "Department_Id", "dbo.Departments");
            DropForeignKey("dbo.Employees", "City_Id", "dbo.Cities");
            DropIndex("dbo.Employees", new[] { "Department_Id" });
            DropIndex("dbo.Employees", new[] { "Title_Id" });
            DropIndex("dbo.Employees", new[] { "State_Id" });
            DropIndex("dbo.Employees", new[] { "City_Id" });
            DropIndex("dbo.Employees", new[] { "MaritalStatus_Id" });
            DropIndex("dbo.Employees", new[] { "Gender_Id" });
            AlterColumn("dbo.Employees", "Title_Id", c => c.Int());
            AlterColumn("dbo.Employees", "State_Id", c => c.Int());
            AlterColumn("dbo.Employees", "MaritalStatus_Id", c => c.Int());
            AlterColumn("dbo.Employees", "Gender_Id", c => c.Int());
            AlterColumn("dbo.Employees", "Department_Id", c => c.Int());
            AlterColumn("dbo.Employees", "City_Id", c => c.Int());
            CreateIndex("dbo.Employees", "Title_Id");
            CreateIndex("dbo.Employees", "State_Id");
            CreateIndex("dbo.Employees", "MaritalStatus_Id");
            CreateIndex("dbo.Employees", "Gender_Id");
            CreateIndex("dbo.Employees", "Department_Id");
            CreateIndex("dbo.Employees", "City_Id");
            AddForeignKey("dbo.Employees", "Title_Id", "dbo.Titles", "Id");
            AddForeignKey("dbo.Employees", "State_Id", "dbo.States", "Id");
            AddForeignKey("dbo.Employees", "MaritalStatus_Id", "dbo.MaritalStatus", "Id");
            AddForeignKey("dbo.Employees", "Gender_Id", "dbo.Genders", "Id");
            AddForeignKey("dbo.Employees", "Department_Id", "dbo.Departments", "Id");
            AddForeignKey("dbo.Employees", "City_Id", "dbo.Cities", "Id");
        }
    }
}

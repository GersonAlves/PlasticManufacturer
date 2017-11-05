namespace PlasticManufacturer.InfraStructure.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AlteracaoHireDateEmployee : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Employees", "HireDate", c => c.DateTime());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Employees", "HireDate", c => c.DateTime(nullable: false));
        }
    }
}

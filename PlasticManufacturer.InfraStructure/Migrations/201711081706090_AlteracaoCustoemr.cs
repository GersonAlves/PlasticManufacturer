namespace PlasticManufacturer.InfraStructure.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AlteracaoCustoemr : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Customers", "FedId", c => c.Int());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Customers", "FedId", c => c.Int(nullable: false));
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PlasticManufacturer.API.Controllers;

namespace PlasticManufacturer.API.Controllers
{
    public class CompleteController : Controller
    {
        // GET: Complete
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public JsonResult Index(string Prefix)
        {
            //Note : you can bind same list from database  
            List<City> ObjList = new List<City>()
            {

                new City {Id=1,Name="Latur" },
                new City {Id=2,Name="Mumbai" },
                new City {Id=3,Name="Pune" },
                new City {Id=4,Name="Delhi" },
                new City {Id=5,Name="Dehradun" },
                new City {Id=6,Name="Noida" },
                new City {Id=7,Name="New Delhi" }

        };
            //Searching records from list using LINQ query  
            var CityName = (from N in ObjList
                            where N.Name.StartsWith(Prefix)
                            select new { N.Name });
            return Json(CityName, JsonRequestBehavior.AllowGet);
        }
    }
}  
    

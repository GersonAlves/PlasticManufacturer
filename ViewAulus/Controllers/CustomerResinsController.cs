using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Web;
using System.Web.Mvc;
using PlasticManufacturer.Domain.Entities.Customers;
using PlasticManufacturer.InfraStructure.Context;

namespace ViewAulus.Controllers
{
    public class CustomerResinsController : Controller
    {
        private PlasticManufacturerContext db = new PlasticManufacturerContext();

        // GET: CustomerResins
        public async Task<ActionResult> Index()
        {
            return View(await db.CustomerResins.ToListAsync());
        }

        // GET: CustomerResins/Details/5
        public async Task<ActionResult> Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            CustomerResin customerResin = await db.CustomerResins.FindAsync(id);
            if (customerResin == null)
            {
                return HttpNotFound();
            }
            return View(customerResin);
        }

        // GET: CustomerResins/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: CustomerResins/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "Id,ResinType,Quantidade,Code,Name,Description,CreationDate,LastUpdate")] CustomerResin customerResin)
        {
            if (ModelState.IsValid)
            {
                db.CustomerResins.Add(customerResin);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }

            return View(customerResin);
        }

        // GET: CustomerResins/Edit/5
        public async Task<ActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            CustomerResin customerResin = await db.CustomerResins.FindAsync(id);
            if (customerResin == null)
            {
                return HttpNotFound();
            }
            return View(customerResin);
        }

        // POST: CustomerResins/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "Id,ResinType,Quantidade,Code,Name,Description,CreationDate,LastUpdate")] CustomerResin customerResin)
        {
            if (ModelState.IsValid)
            {
                db.Entry(customerResin).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(customerResin);
        }

        // GET: CustomerResins/Delete/5
        public async Task<ActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            CustomerResin customerResin = await db.CustomerResins.FindAsync(id);
            if (customerResin == null)
            {
                return HttpNotFound();
            }
            return View(customerResin);
        }

        // POST: CustomerResins/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(int id)
        {
            CustomerResin customerResin = await db.CustomerResins.FindAsync(id);
            db.CustomerResins.Remove(customerResin);
            await db.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}

using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Web;
using System.Web.Mvc;
using PlasticManufacturer.Domain.Entities.Common;
using PlasticManufacturer.InfraStructure.Context;

namespace ViewAulus.Controllers
{
    public class PelletsController : Controller
    {
        private PlasticManufacturerContext db = new PlasticManufacturerContext();

        // GET: Pellets
        public async Task<ActionResult> Index()
        {
            return View(await db.Pellets.ToListAsync());
        }

        // GET: Pellets/Details/5
        public async Task<ActionResult> Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Pellet pellet = await db.Pellets.FindAsync(id);
            if (pellet == null)
            {
                return HttpNotFound();
            }
            return View(pellet);
        }

        // GET: Pellets/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Pellets/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "Id,Name,Description,CreationDate,LastUpdate")] Pellet pellet)
        {
            if (ModelState.IsValid)
            {
                db.Pellets.Add(pellet);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }

            return View(pellet);
        }

        // GET: Pellets/Edit/5
        public async Task<ActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Pellet pellet = await db.Pellets.FindAsync(id);
            if (pellet == null)
            {
                return HttpNotFound();
            }
            return View(pellet);
        }

        // POST: Pellets/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "Id,Name,Description,CreationDate,LastUpdate")] Pellet pellet)
        {
            if (ModelState.IsValid)
            {
                db.Entry(pellet).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(pellet);
        }

        // GET: Pellets/Delete/5
        public async Task<ActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Pellet pellet = await db.Pellets.FindAsync(id);
            if (pellet == null)
            {
                return HttpNotFound();
            }
            return View(pellet);
        }

        // POST: Pellets/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(int id)
        {
            Pellet pellet = await db.Pellets.FindAsync(id);
            db.Pellets.Remove(pellet);
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

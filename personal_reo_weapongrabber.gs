function onCreated() {

  for (temp.npc : npcs) {
    if (npc.id == 4) {
      this.dummy = npc;
      break;
    }
  }

  drawunderplayer();
  dontblock();

  this.debounce = false;
  server.optionsList = {};
  this.chat = this.wepName;

  this.yOffset = 0;

  setshape(1, 56, 56);
}

function clearOptions() {
  this.yOffset = 0;

  for (temp.npc : npcs) {
    if (npc.id in server.optionsList) {
      server.optionsList.remove(npc.id);
      npc.destroy();
    }
  }
}

function createNewOption(optName, optVal, ganiStart) {
    temp.newNpc = putnpc2(this.dummy.x + 10, this.dummy.y + this.yOffset, "");
    newNpc.join("personal_reo_testnpc");

    this.yOffset += 3;

    newNpc.chat = optName;

    triggeraction(this.x+1, this.y+1, "SetGaniToSend", newNpc.id, ganiStart @ optVal);

    server.optionsList.add(newNpc.id);
    return newNpc;
}

function onActionGrab() {
  if (!this.debounce) {
    this.debounce = true;

    clearOptions();

    temp.counter = 0;
    for (temp.opt : this.gani_options) {
      createNewOption(opt, this.gani_optionvals[temp.counter], this.gani_start);
      temp.counter++;
    }

    triggeraction(this.x+1, this.y+1, "SetStartingGani", this.dummy.id, this.first_gani, this.wepName, server.optionsList);

    sleep(2);

    this.debounce = false;
  }
}

//#CLIENTSIDE

function onCreated() {
  setshape(1, 56, 56);
}

function onActionSetStartingGani(npcid, gani, wepName, npcids) {
  for (temp.npc : npcs) {
    if (npc.id == npcid) {
      this.foundNpc = npc;
      break;
    }
  }

  triggeraction(this.foundNpc.x+1, this.foundNpc.y+1, "SetGun", wepName);
  this.foundNpc.setGani(gani);
}

function onActionSetGaniToSend(npcid, ganiToSend) {
  for (temp.npc : npcs) {
    if (npc.id == npcid) {
      this.foundNpc = npc;
      break;
    }
  }

  this.foundNpc.setGaniToSend(ganiToSend);
}

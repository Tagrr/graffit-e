class WallsController < ApplicationController
  before_action :set_wall, only: [:edit, :update, :destroy]
  # TODO send the authenticity token instead of skip it
  skip_before_filter :verify_authenticity_token, :only => [:createGraph, :destroyGraph, :updateGraph]

  # GET /walls
  # GET /walls.json
  def index
    if user_signed_in?
      @walls = Wall.where user_id: current_user.id
    else
      @walls = Wall.where user_id: nil
    end
  end

  def wall
    @wall = Wall.last
  end

  # GET /walls/1
  # GET /walls/1.json
  def show
    @wall = Wall.find_by name: params[:id]
  end

  def showGraphs
    @wall = Wall.find_by name: params[:id]
    respond_to do |format|
      format.json { render json: @wall.graphs }
    end

  end

  # GET /walls/new
  def new
    @wall = Wall.new
  end

  # GET /walls/1/edit
  def edit
  end

  # POST /walls
  # POST /walls.json
  def create

    @wall = Wall.new(wall_params)
    @wall.user = current_user if user_signed_in?
    respond_to do |format|
      if @wall.save
        format.html { redirect_to @wall, notice: 'Wall was successfully created.' }
        format.json { render :show, status: :created, location: @wall }
      else
        format.html { render :new }
        format.json { render json: @wall.errors, status: :unprocessable_entity }
      end
    end
  end

  def createGraph
    @graph = Graph.new(graph_params)
    @wall = Wall.find_by name: params[:id]
    throw Error.new "no wall found for #{params[:id]}." if @wall.nil?
    @graph.wall = @wall

    respond_to do |format|
      if @graph.save
        format.json { render json: @wall.graphs }
      else
        format.html { render :new }
        format.json { render json: @wall.errors, status: :unprocessable_entity }
      end
    end
  end

  def updateGraph
    @graph = Graph.find(params[:graph_id])

    respond_to do |format|
      if @graph.update(graph_params)
        format.json { render json: @graph }
      else
        format.html { render :new }
        format.json { render json: @wall.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroyGraph
    @graph = Graph.find(params[:graph_id])
    throw "no graph found for #{params[:graph_id]}." if @graph.nil?

    @graph.destroy

    respond_to do |format|
      format.html { redirect_to walls_url, notice: 'Wall was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  # PATCH/PUT /walls/1
  # PATCH/PUT /walls/1.json
  def update
    respond_to do |format|
      if @wall.update(wall_params)
        format.html { redirect_to @wall, notice: 'Wall was successfully updated.' }
        format.json { render :show, status: :ok, location: @wall }
      else
        format.html { render :edit }
        format.json { render json: @wall.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /walls/1
  # DELETE /walls/1.json
  def destroy
    @wall.destroy
    respond_to do |format|
      format.html { redirect_to walls_url, notice: 'Wall was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_wall
      @wall = Wall.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def wall_params
      params.require(:wall).permit(:name, :description, :background)
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def graph_params
      params.require(:graph).permit(:text, :img, :style)
    end
end
